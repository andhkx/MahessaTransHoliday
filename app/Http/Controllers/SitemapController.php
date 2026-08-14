<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Post;

class SitemapController extends Controller {
    public function index() {
        $packages = Package::where('is_active', 1)->latest()->get();
        $posts = Post::where('is_active', 1)->latest()->get();
        return response()->view('seo.sitemap', compact('packages', 'posts'))->header('Content-Type', 'text/xml');
    }
}
