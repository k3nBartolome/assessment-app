<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:applicant',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $applicant = Applicant::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
        ]);

        $token = $applicant->createToken('Applicant Token')->plainTextToken;

        return response()->json(['id' => $applicant->id, 'token' => $token], 201);
    }

    public function updateAssessment(Request $request, $id)
    {
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json(['message' => 'Applicant not found'], 404);
        }

        $validatedData = $request->validate([
            'question1' => 'nullable|string',
            'question2' => 'nullable|string',
            'question3' => 'nullable|string',
            'question4' => 'nullable|string',
            'question1_start' => 'required|date_format:H:i',
            'question2_start' => 'required|date_format:H:i',
            'question3_start' => 'required|date_format:H:i',
            'question4_start' => 'required|date_format:H:i',
            'question1_end' => 'required|date_format:H:i',
            'question2_end' => 'required|date_format:H:i',
            'question3_end' => 'required|date_format:H:i',
            'question4_end' => 'required|date_format:H:i',
        ]);

        $applicant->update($validatedData);

        return response()->json([
            'message' => 'Assessment updated successfully',
            'applicant' => $applicant
        ]);
    }
}
