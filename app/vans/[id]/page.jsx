
import classes from '../../modules/VanDetail.module.css'

import Link from 'next/link'

//Custom Components
import VanDetailCarousel from '@/app/components/VanDetailCarousel';
import VanDetailInfo from '@/app/components/VanDetailInfo';

import { getVan } from '@/app/api/vanFetching';
import { getCurrentUserById } from '@/app/api/api';

export default async function VanDetail({ params }){
    const van = await getVan(params.id)
    const host = await getCurrentUserById(van.hostId)

    return (
        <section className={ classes.body }>
            <VanDetailCarousel van={ van } />
            <VanDetailInfo van={ van } host={ host }/>

        </section>
    )
}
