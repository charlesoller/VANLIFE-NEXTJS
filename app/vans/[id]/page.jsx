import { Divider, Space, Text, Paper } from '@mantine/core';
import classes from '../../modules/VanDetail.module.css'

//Custom Components
import VanDetailCarousel from '@/app/components/VanDetailCarousel';
import VanDetailInfo from '@/app/components/VanDetailInfo';
import PaymentWidget from '@/app/components/PaymentWidget';
import CommentCarousel from '@/app/components/CommentCarousel';
import CardsCarousel from '@/app/components/Carousel';
import SelfPromo from '@/app/components/SelfPromo';

import { getVan, getVans } from '@/app/api/vanFetching';
import { getCurrentUserById, getCurrentUser } from '@/app/api/api';

export default async function VanDetail({ params }){
    const van = await getVan(params.id)
    const allVans = await getVans();
    const host = await getCurrentUserById(van.hostId)
    const user = await getCurrentUser();

    return (
        <section className={ classes.body }>
            <VanDetailCarousel van={ van } />
            <div className={ classes.grid }>
                <div>
                    <VanDetailInfo van={ van } host={ host }/>
                    <Divider my='xl'/>
                    <Text
                        variant='gradient'
                        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                        fw={700}
                        style={{fontSize: '1.7rem', marginBottom: '0.5em'}}
                    >
                        This is what people are saying
                    </Text>
                    <div>
                        <CommentCarousel />
                    </div>
                </div>
                <div style={{paddingBottom: '3%'}}>
                    <PaymentWidget price={ van.price } id={ van.id } user= { user.session }/>
                </div>
            </div>
            <div className={classes.promo}>
                <SelfPromo />
            </div>
            <Text
                variant='gradient'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                fw={700}
                style={{fontSize: '1.7rem', marginBottom: '0.5em'}}
            >
                Not quite right? Try something else!
            </Text>
            <CardsCarousel elements={ allVans }/>
        </section>
    )
}
