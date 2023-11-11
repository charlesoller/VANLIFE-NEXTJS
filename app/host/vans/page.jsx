import Card from "@/app/components/CarouselCard";
import { myCreateServerClient } from "@/app/api/customHooks";


export default async function HostVans(){
    const supabase = await myCreateServerClient();

    async function getHostVans(){
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        if(sessionError) console.log(sessionError)
        const userEmail = sessionData.session.user.email

        const {data: userData, error: userError} = await supabase
            .from('users')
            .select('id, email')
            .eq('email', userEmail)

        if(userError) console.log(userError)
        const userId = userData[0].id

        const {data: vanData, error: vanError} = await supabase
            .from('vans')
            .select()
            .eq('hostId', userId)
        if(vanError) console.log(vanError)

        return vanData
    }

    const vans = await getHostVans();
    const hostVans = vans.map(van => {
        return <Card key={van.id} image={van.imageUrl} title={van.name} category={van.type}>View your van</Card>
    })

    return (
        <div className="host-vans">
            <h1 className="host-vans__title">Your listed vans</h1>
            <div className="host-vans__grid">
                { hostVans }
            </div>
        </div>
    )
}
