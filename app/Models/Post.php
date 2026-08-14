<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model {
    protected $fillable = ['title','slug','body','image_path','is_active','meta_title','meta_description'];

    protected static function booted() {
        static::saving(function ($post) {
            if (empty($post->slug)) $post->slug = Str::slug($post->title);
            if (empty($post->meta_title)) $post->meta_title = $post->title . ' - Blog Mahessa Trans';
            if (empty($post->meta_description)) $post->meta_description = Str::limit(strip_tags($post->body), 150);
        });
    }
    public function getImageUrlAttribute() {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }
}
