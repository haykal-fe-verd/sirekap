<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 10);
        $search = $request->query('search', '');
        $sort = $request->query('sort', 'name');
        $direction = $request->query('direction', 'asc');

        $user = User::query();

        if ($search) {
            $user->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        if ($sort && $direction) {
            $user->orderBy($sort, $direction);
        }

        $user = $user->paginate($limit, ['*'], 'page', $page);
        $data =  UserResource::collection($user);

        return Inertia::render('user/index', compact('data'));
    }

    public function create()
    {
        return Inertia::render('user/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'min:6'],
            'role' => ['required', 'in:admin,user'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('user.index')->with('success', 'User berhasil dibuat');
    }

    public function edit(string $id)
    {
        $data = User::findOrFail($id);

        return Inertia::render('user/edit', compact('data'));
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class . ',email,' . $user->id,
            'password' => ['nullable', 'min:6'],
            'role' => ['required', 'in:admin,user'],
        ]);

        $password = $request->input('password');

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => $password ? Hash::make($password) : $user->password,
        ]);

        return redirect()->route('user.index')->with('success', 'User berhasil diubah');
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('user.index')->with('success', 'User berhasil dihapus');
    }
}
