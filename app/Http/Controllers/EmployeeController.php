<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\EmployeeImport;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function index (){
        $employees = Employee::all();
        return Inertia::render('Employee/DashboardEmployee', ['datas' => fn () => $employees]);
    }

    public function create(){
        return Inertia::render('Employee/EmployeeForm', ['mode' => 'create']);
    }

    public function store(Request $request){
        $validateData = $this->validateInput($request);
        Employee::create($validateData);

        return redirect()->back()->with('message', 'Berhasil menambahkan data');
    }

    public function edit($id) {
        $editedData = Employee::where('id', $id);
        return Inertia::render('Employee/EmployeeForm', ['mode' => 'edit', 'datas' => $editedData->get()]);
    }

    public function update(Request $request, $id){
        $editedData = Employee::find($id);
        $validateData = $this->validateInput($request);

        $editedData->update($validateData);
        return redirect()->back()->with('message', 'Berhasil mengubah data');
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();
       
        return redirect()->back()->with('message', 'Berhasil menghapus data');
    }

    public function validateInput ($request) {
        return $request->validate([
            'name' => 'required',
            'rank' => 'nullable',
            'position' => 'nullable',
            'nip' => 'nullable',
            'group' => 'nullable',
        ]);
    }



    public function importEmployee(Request $request){
        $data = $request->file('file');

        Excel::import(new EmployeeImport, $data);
         return redirect()->back()->with('message', 'Berhasil mengimport data');
        // try{
        //     return redirect('/employee-list');
        // }catch(Throwable $e){
        //     Alert::toast('Gagal import, pastikan kolom excel sudah sesuai ketentuan', 'error');
        //     return redirect('/employee-list');
        // }
    }
}
