import { Divider, Text, Flex, Button } from '@mantine/core';
import classes from '../../modules/VanDetail.module.css'

//Custom Components
import VanDetailCarousel from '@/app/components/VanDetailCarousel';
import VanDetailInfo from '@/app/components/VanDetailInfo';
import PaymentWidget from '@/app/components/PaymentWidget';
import CardsCarousel from '@/app/components/Carousel';
import SelfPromo from '@/app/components/SelfPromo';
import CommentSection from '@/app/components/CommentSection';

import { getVan, getVans } from '@/app/api/vanFetching';
import { getCurrentUserById, getCurrentUser, getCurrentUserByEmail, getComments } from '@/app/api/api';

export default async function VanDetail({ params }){
    const van = await getVan(params.id)
    const allVans = await getVans();
    const host = await getCurrentUserById(van.hostId)
    const user = await getCurrentUser();
    let userId = null;
    const comments = await getComments(van.id)


    if(user.session){
        userId = await getCurrentUserByEmail(user.session.user.email)
        userId = userId[0].id
    }

    return (
        <section className={ classes.body }>
            <VanDetailCarousel van={ van } />
            <div className={ classes.grid }>
                <div>
                    <VanDetailInfo van={ van } host={ host }/>
                    <Divider my='xl'/>
                    <CommentSection comments={comments} userId={userId} vanId={van.id} hostId={host.id}/>
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
