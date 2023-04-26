<?php

namespace App\Http\Controllers;
use App\Imports\AssetsImport;
use App\Models\Asset;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Intervention\Image\Facades\Image as CompressImage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class AssetController extends Controller
{

    public function index(){
        $tangibleAssets = Asset::orderBy('created_at')->where('item_category', 'Berwujud')->select(['id','item_name', 'price', 'item_year', 'brand']);
        $itangibleAssets = Asset::orderBy('created_at')->where('item_category', 'Tak Berwujud')->select(['id','item_name', 'price', 'item_year', 'creator']);
        return Inertia::render('Asset/DashboardAsset', [
            'tangibleAsset' => fn () => $tangibleAssets->get(), 
            'itangibleAsset' => fn () => $itangibleAssets->get()
        ]);
    }

    public function create(){
        $employees = Employee::all();
        return Inertia::render('Asset/FormAsset', ['mode' => 'create', 'employees' => $employees]);
    }

    public function edit($id){
        $editedAsset = Asset::where('id', $id);
        $employees = Employee::all();
        return Inertia::render('Asset/FormAsset', ['mode' => 'edit', 'datas' => $editedAsset->get(),  'employees' => $employees]);
    }

    public function store(Request $request){
        // $request->item_category === 'Berwujud' ? $this->storedTangibleAsset($request) :  $this->storedItangibleAsset($request);
        $validatedData = $this->validateInput($request);
        $validatedData['internal_code'] = $this->generateInternalCode();
        $validatedData['used'] = $request->user === null ? 0 : 1;

        $validatedData['physical_evidence'] = $request->file('physical_evidence') ? $this->compressImage($request->file('physical_evidence')) : null; 
        if($request->file('file_bast')){
            $file = $request->file('file_bast')->store('file-bast');
            $validatedData['file_bast'] = substr($file, 10);
        }

        Asset::create($validatedData);
        return redirect()->back()->with('message', 'Berhasil menambahakan data');
    }

    public function showLabel($id){
        $asset = Asset::where('id', $id)->get();
        return Inertia::render('Asset/LabelAsset', ['datas' => $asset]);
    }

    // public function storedItangibleAsset($request){
    //     $validatedData = $this->validateInput($request);
    //     $validatedData['internal_code'] = $this->generateInternalCode();
    //     $validatedData['used'] = $request->user === null ? 0 : 1;

    //     Asset::create($validatedData);
    //     return redirect()->back()->with('message', 'Berhasil menambahakan data');
    // }

    // public function storedTangibleAsset($request) {
    //     $validatedData = $this->validateInput($request);
    //     $validatedData['internal_code'] = $this->generateInternalCode();
    //     $validatedData['used'] = $request->user === null ? 0 : 1;

    //     $validatedData['physical_evidence'] = $request->file('physical_evidence') ? $this->compressImage($request->file('physical_evidence')) : null; 
    //     if($request->file('file_bast')){
    //         $file = $request->file('file_bast')->store('file-bast');
    //         $validatedData['file_bast'] = substr($file, 10);
    //     }

    //     Asset::create($validatedData);
    //     return redirect()->back()->with('message', 'Berhasil menambahakan data');
    // }

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

    // public function updateTangibleAsset($request, $id) {
    //     $editedAsset = Asset::find($id);
    //     $validatedData = $this->validateInput($request);

    //     $validatedData['used'] = $request->user === null ? 0 : 1;

    //     if($request->file('physical_evidence')){
    //         if($this->deleteOldImage($request->physical_evidence, $editedAsset->physical_evidence)){
    //             $validatedData['physical_evidence'] = $this->compressImage($request->file('physical_evidence'));
    //         }
    //     }
    //     $editedAsset->update($validatedData);
    //     return redirect()->back()->with('message', 'Berhasil memperbarui data');
    // }

    // public function updateItangibleAsset($request, $id) {
    //     $editedAsset = Asset::find($id);
    //     $validatedData = $this->validateInput($request);
    //     $validatedData['internal_code'] = $this->generateInternalCode();
    //     $validatedData['used'] = $request->user === null ? 0 : 1;

    //     Asset::create($validatedData);
    //     return redirect()->back()->with('message', 'Berhasil menambahakan data');

    // }

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
