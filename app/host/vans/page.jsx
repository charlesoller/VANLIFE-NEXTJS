import HostVanThumbnail from "../../components/HostVanThumbnail"
import { useCreateServerClient } from "@/app/api/customHooks"

export default async function HostVans(){
    async function getVans(){
        const supabase = await useCreateServerClient();

        const { data, error } = await supabase.from('vans')
            .select()
            .eq('hostId', 123)

        if(error){
            console.log(error.message)
        }

        return data;
    }

    const vans = await getVans();
    const vansElement = vans.map(van => {
        return (
            <HostVanThumbnail
                key={ van.id }
                id={ van.id }
                name={ van.name }
                price={ van.price }
                imageUrl = { van.imageUrl }
            />
        )
    })

    return (
        <div className="host-vans">
            <h1 className="host-vans__title">Your listed vans</h1>
            <div className="host-vans__grid">
                { vansElement }
            </div>
        </div>
    )
}
