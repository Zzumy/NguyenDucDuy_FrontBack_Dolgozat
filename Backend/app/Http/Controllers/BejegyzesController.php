<?php

namespace App\Http\Controllers;

use App\Models\Bejegyzesek;
use Illuminate\Http\Request;

class BejegyzesController extends Controller
{
    public function index()
    {
        return response()->json(Bejegyzesek::all());
    }

    public function show($id)
    {
        return Bejegyzesek::find($id);
    }

    public function store(Request $request)
    {
        $bejegyzesek = new Bejegyzesek();
        $bejegyzesek->tevekenyseg_id = $request->tevekenyseg_id;
        $bejegyzesek->osztaly_id = $request->osztaly_id;
        $bejegyzesek->allapot = $request->allapot;
        $bejegyzesek->save();
    }

    public function update(Request $request, $id)
    {
        $bejegyzesek = Bejegyzesek::find($id);
        $bejegyzesek->tevekenyseg_id = $request->tevekenyseg_id;
        $bejegyzesek->osztaly_id = $request->osztaly_id;
        $bejegyzesek->allapot = $request->allapot;
        $bejegyzesek->save();
    }

    public function destroy($id)
    {
        Bejegyzesek::find($id)->delete();
    }

    public function selected($ids)
    {
        return Bejegyzesek::find(explode(",", $ids));
    }
}
