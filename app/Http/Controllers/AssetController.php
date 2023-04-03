<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{

    public function Index(){
        $tangibleAssets = Asset::orderBy('created_at', 'desc')->where('item_category', 'Berwujud')->get();
        return Inertia::render('Asset/DashboardAsset', ['tangibleAsset' => $tangibleAssets]);
    }
    public function StoredTangibleAsset(Request $request) {

        $validatedData = $request->validate([
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
            'item_year' =>'required',
            'item_condition' =>'nullable',
            'price' =>'required',
            'location' =>'nullable',
        ]);
  
        $validatedData['internal_code'] = $this->GenerateInternalCode();
        $validatedData['used'] = 0;

       Asset::create($validatedData);
    }

    public function GenerateInternalCode() {
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
}
