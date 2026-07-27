<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class BlogController extends Controller {
    public function index() {
        $posts = Post::where('is_active', 1)->latest()->paginate(6);
        return view('frontend.blog-index', compact('posts'));
    }
    public function show($slug) {
        $post = Post::where('slug', $slug)->where('is_active', 1)->firstOrFail();
        $recentPosts = Post::where('slug', '!=', $slug)->where('is_active', 1)->latest()->take(3)->get();
        return view('frontend.blog-detail', compact('post', 'recentPosts'));
    }
}
