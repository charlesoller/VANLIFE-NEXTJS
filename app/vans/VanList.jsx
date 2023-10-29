import Link from "next/link"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

//Component Imports
import VanThumbnail from "../components/VanThumbnail"

async function getVans(){
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get(name) {
              return cookieStore.get(name)?.value
            },
          },
        }
      )

    const { data, error } = await supabase.from('vans')
        .select()

    if(error){
        console.log("ERROR")
    }

    return data;
}

export default async function VanList(){
    const vanData = await getVans();
    const vansElement = vanData.map(van => {
        return (
            <Link className="van--thumbnail" href="van-detail" key={ van.id }>
                <VanThumbnail
                    name={ van.name }
                    price={ van.price }
                    imageUrl = { van.imageUrl }
                    type={ van.type }
                />
            </Link>
        )
    })
    return (
        vanData ? vansElement : <h1>There are no vans!</h1>
    )
}
