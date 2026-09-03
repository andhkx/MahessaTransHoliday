import { NextResponse } from 'next/server';
import { getAllVehicles } from '@/lib/data/supabase/vehicles';
import { getAllPackages } from '@/lib/data/supabase/packages';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const [vehicles, packages] = await Promise.all([
      getAllVehicles(),
      getAllPackages(),
    ]);
    return NextResponse.json({
      vehicles: vehicles.slice(0, 20).map((v) => ({
        id: v.id,
        name: v.name,
        category: v.category,
        capacity: v.capacity,
        image: v.image,
        pricing: v.pricing,
      })),
      packages: packages.slice(0, 20).map((p) => ({
        id: p.id,
        name: p.destination,
        destination: p.destination,
        duration: p.duration,
        price: p.price,
        image: p.image,
      })),
    });
  } catch (e) {
    return NextResponse.json({ vehicles: [], packages: [] }, { status: 500 });
  }
}