<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Menampilkan halaman daftar artikel (Tabel)
     */
    public function index()
    {
        // Mengambil semua artikel, diurutkan dari yang terbaru
        $posts = Post::latest()->paginate(10);
        return view('admin.posts.index', compact('posts'));
    }

    /**
     * Menampilkan halaman formulir tambah artikel
     */
    public function create()
    {
        return view('admin.posts.create');
    }

    /**
     * Memproses data dari formulir tambah artikel dan menyimpannya ke database
     */
    public function store(Request $request)
    {
        // 1. Validasi inputan Anda
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean'
        ]);

        // 2. Siapkan data yang akan disimpan
        $data = [
            'title' => $request->title,
            'body' => $request->body,
            'is_active' => $request->has('is_active') ? 1 : 0,
            // Slug, meta_title, dan meta_description otomatis dibuat oleh Model Post Anda
        ];

        // 3. Proses Upload Foto (jika Anda mengunggah foto)
        if ($request->hasFile('image')) {
            // Ini akan menyimpannya ke folder public_html/storage/posts (sesuai setting config Anda)
            $data['image_path'] = $request->file('image')->store('posts', 'public');
        }

        // 4. Simpan ke database
        Post::create($data);

        // 5. Kembalikan ke halaman daftar dengan pesan sukses
        return redirect()->route('posts.index')->with('success', 'Artikel Blog berhasil ditambahkan!');
    }

    /**
     * Menampilkan halaman formulir edit artikel
     */
    public function edit(Post $post)
    {
        return view('admin.posts.edit', compact('post'));
    }

    /**
     * Memproses data pembaruan artikel
     */
    public function update(Request $request, Post $post)
    {
        // 1. Validasi inputan
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean'
        ]);

        // 2. Siapkan data baru
        $data = [
            'title' => $request->title,
            'body' => $request->body,
            'is_active' => $request->has('is_active') ? 1 : 0,
        ];

        // 3. Jika Anda mengunggah foto baru saat edit
        if ($request->hasFile('image')) {
            // Hapus foto lama dari storage jika ada
            if ($post->image_path) {
                Storage::disk('public')->delete($post->image_path);
            }
            // Simpan foto baru
            $data['image_path'] = $request->file('image')->store('posts', 'public');
        }

        // 4. Update data di database
        $post->update($data);

        // 5. Kembali ke daftar
        return redirect()->route('posts.index')->with('success', 'Artikel Blog berhasil diperbarui!');
    }

    /**
     * Menghapus artikel
     */
    public function destroy(Post $post)
    {
        // 1. Hapus foto fisiknya dari folder storage
        if ($post->image_path) {
            Storage::disk('public')->delete($post->image_path);
        }

        // 2. Hapus datanya dari database
        $post->delete();

        // 3. Kembali ke daftar
        return redirect()->route('posts.index')->with('success', 'Artikel Blog berhasil dihapus!');
    }
}