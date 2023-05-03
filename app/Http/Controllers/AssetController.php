<?php

namespace App\Http\Controllers;
use App\Imports\AssetsImport;
use App\Models\Asset;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;
use Intervention\Image\Facades\Image as CompressImage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class AssetController extends Controller
{

    public function index(){
        $tangibleAssets = Asset::orderBy('created_at', 'desc')
            ->where('item_category', 'Berwujud')
            ->select(['id','item_name', 'price', 'item_year', 'brand']);
        $itangibleAssets = Asset::orderBy('created_at', 'desc')
            ->where('item_category', 'Tak Berwujud')
            ->select(['id','item_name', 'price', 'item_year', 'creator']);
        $employees = DB::table('employees')->select('name as value', 'name as label')->get();

        
        return Inertia::render('Asset/DashboardAsset', [
            'tangibleAsset' => fn () => $tangibleAssets->get(), 
            'itangibleAsset' => fn () => $itangibleAssets->get(),
            'employees' => fn () => $employees
        ]);
    }

    public function create(){
        $tangibleAssets = DB::table('assets')
            ->select('internal_code', 'item_name', 'brand', 'item_year', 'price')
            ->groupByRaw('internal_code, item_name, brand, item_year, price')
            ->orderBy('created_at', 'desc')->get();
        $employees = Employee::all();
        return Inertia::render('Asset/FormAsset', [
            'mode' => 'create', 
            'employees' => $employees, 
            'tangibleAssets' => $tangibleAssets
        ]);
    }

    public function edit($id){
        $editedAsset = Asset::where('id', $id);
        $employees = Employee::all();
        return Inertia::render('Asset/FormAsset', [
            'mode' => 'edit', 
            'datas' => $editedAsset->get(),  
            'employees' => $employees
        ]);
    }

    public function store(Request $request){
        $validatedData = $this->validateInput($request);
        $validatedData['internal_code'] = $request->internal_code ?? $this->generateInternalCode();
        $validatedData['used'] = $request->user === null ? 0 : 1;

        $validatedData['physical_evidence'] = $request->file('physical_evidence') ? $this->compressImage($request->file('physical_evidence')) : null; 
        if($request->file('file_bast')){
            $file = $request->file('file_bast')->store('file-bast');
            $validatedData['file_bast'] = substr($file, 10);
        }

        Asset::create($validatedData);
        return redirect()->back()->with('message', 'Berhasil menambahakan data');
    }

    public function showLabel($id, $mode){
        $asset = Asset::where('id', $id)->get();
        return Inertia::render('Asset/LabelAsset', ['datas' => $asset, 'mode' => $mode]);
    }

    public function update(Request $request, $id){
        $editedAsset = Asset::find($id);
        $validatedData = $this->validateInput($request);

        $validatedData['used'] = $request->user === null ? 0 : 1;

        if($request->file('physical_evidence')){
            if($this->deleteOldImage($request->physical_evidence, $editedAsset->physical_evidence)){
                $validatedData['physical_evidence'] = $this->compressImage($request->file('physical_evidence'));
            }
        }
        $editedAsset->update($validatedData);
        return redirect()->back()->with('message', 'Berhasil memperbarui data');
    }

    public function exportPdfFile(Request $request){  
        $params = [
            'item_category' => $request->item_category,
            'keyword' => $request->keyword,
            'start_year' => $request->start_year,
            'end_year' => $request->end_year,
            'column_data' => $request->column_data
        ];

        return to_route('AssetPDF', $params);
    }

    public function renderPDF (Request $request) {
        $keywords = explode(' ', $request->keyword);
        $title = 'BERDASARKAN PENCARIAN';
        $columnDataKey = array_map(function ($val){
            return $val['value'];
        }, $request->column_data);

        $assets = Asset::where('item_category', '=', $request->item_category)
            ->where('item_year', '>=', $request->start_year)
            ->where('item_year', '<=', $request->end_year)->select($columnDataKey);

        $tableHeader = array_map(function ($val){
            return $val['label'];
        }, $request->column_data);

        if($request->user !== null){
            $assets->where('user', '=', $request->user);
            $title = "{$title} PENGGUNA";
        }else{
            if($request->keyword !== null){
                $assets->where(function ($query) use ($keywords){
                    foreach($keywords as $keyword){
                        $query->orWhere('item_name', 'like', '%' . $keyword . '%')
                        ->orWhere('brand', 'like', '%' . $keyword . '%');
                    }
               });
               $title = $title . ' ' . strtoupper($request->keyword);
            }
        }

        $request->start_year !== $request->end_year ?
            $title = $title." TAHUN {$request->start_year} - {$request->end_year}" :
            $title = $title." TAHUN {$request->start_year}";

        $totalPrice = 0;
        foreach($assets->get() as $asset){
            $totalPrice += (int)$asset->price;
        }
        
        return Inertia::render('Documents/AssetExport', [
            'data' => $assets->get(),
            'header' => $tableHeader,
            'cellKey' => $columnDataKey,
            'title' => $title,
            'totalPrice' => $totalPrice
        ]);
    }
    
    public function destroy($id)
    {
        $asset = Asset::find($id);
        $asset->delete();
       
        return redirect()->back()->with('message', 'Berhasil menghapus data');
    }

    public function validateInput($request){
        if($request->item_category === 'Berwujud'){
            return $request->validate([
                'item_category' => 'required',
                'item_code' => 'required',
                'item_name' => 'required',
                'certification_number' => 'nullable',
                'how_to_earn' => 'required',
                'item_size' => 'nullable',
                'unit' => 'nullable',
                'total' =>'required',
                'registration' =>'nullable',
                'brand' =>'nullable',
                'ingredient' =>'nullable',
                'spesification' =>'nullable',
                'item_year' =>'required',
                'item_condition' =>'nullable',
                'price' =>'required',
                'location' =>'nullable',
                'description' => 'nullable',
                'user' => 'nullable'
            ]);

        }else{
            return $request->validate([
                'item_category' => 'required',
                'how_to_earn' => 'required',
                'item_condition' =>'nullable',
                'item_code' => 'required',
                'item_name' => 'required',
                'registration' =>'nullable',
                'item_year' =>'required',
                'certification_number' => 'nullable',
                'title' =>'nullable',
                'creator' =>'nullable',
                'price' =>'required',
                'total' =>'nullable',
                'description' => 'nullable',
                'user' => 'nullable'
            ]);
        }
    }



    public function show($id) {
        $asset = Asset::where('id', $id);
        return Inertia::render('Asset/DetailedAsset', ['assetData' => $asset->get()]);
    }

    public function deleteOldImage($newImage, $oldImage){
        if(FacadesFile::exists(public_path($oldImage)) && $newImage !== $oldImage){
            FacadesFile::delete(public_path($oldImage));
            return true;
        }else{
            return false;
        }
    }

    public function compressImage($image){
        $fileName = time() . null . $image->getClientOriginalName();
        $image = CompressImage::make($image);
        $image->resize(350, null, function ($constraint) {
            $constraint->aspectRatio();
        });

        $image->save(\public_path('upload-image/' . $fileName));

        return 'upload-image/' . $fileName;
    }

    public function generateInternalCode() {
        $unique = false;
        $resultCode = 0;
        while($unique == false){
            $internalCode = rand(0, 10000);
            if(Asset::where('internal_code', '=', $internalCode)->count() == 0){
                $unique = true;
                if($internalCode < 1000){
                        $resultCode = str_pad((string)$internalCode, 4,"0", STR_PAD_LEFT);
                }else{
                        $resultCode = $internalCode;
                }

            }
        }
        return "K-{$resultCode}";
    }


    public function importExcelFile(Request $request){
        $data = $request->file('file');

        Excel::import(new AssetsImport($request), $data);
        return redirect()->back()->with('message', 'Berhasil mengimport data');
      
    //    dd('Gagal import, pastikan kolom excel sudah sesuai ketentuan', 'error');
        // try{
           
        // }catch(Throwable $e){
           
        // }
    }
}
