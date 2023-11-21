import classes from '../modules/VanDetailInfo.module.css'
import { Flex, Text, Divider, rem, Avatar } from "@mantine/core"
import { IconStarFilled } from '@tabler/icons-react'
import TypeTag from '@/app/components/TypeTag'
import Link from 'next/link'

interface VanProps {
    van: {
        name: string,
        description: string,
        type: string,
        imageUrl: string,
        price: number,
        id: string,
        hostId: string
    }

    host: {
        id: string,
        first_name: string,
        email: string,
        photo: string,
        last_name: string,
        liked_vans?: []
    };
}

export default function VanDetailInfo({ van, host }: VanProps){
    return (
        <section className={classes.body}>
            <h1 className={classes.name}>{van.name}</h1>
            <Flex className={ classes.vanInfo } align="center" gap="xs">
                <TypeTag type={ van.type } className={classes.type} disabled/>
                <IconStarFilled style={{ width: rem(16), height: rem(16), color: "#FFD43B"}} />
                <Text c="dimmed" className={classes.text}>4.8 (32 reviews)</Text>
            </Flex>
            <Divider my="lg"/>
            <Flex gap="md" align="center">
                <Avatar src={host.photo} size="4rem"/>
                <div>
                    <Text size='lg'>Hosted by: <b>{host.first_name} {host.last_name}</b></Text>
                    <Flex align="center">
                        <IconStarFilled style={{ width: rem(16), height: rem(16), color: "#FFD43B"}} />
                        <Text c="dimmed" className={classes.text} ml={6}>4.9 (25 reviews)</Text>
                    </Flex>
                </div>
            </Flex>
            <Divider my="lg"/>
            <Text size='lg' className={classes.description}>
                { van.description }
            </Text>
        </section>
    )
}
