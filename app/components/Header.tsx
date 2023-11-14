import {
    Group,
    Button,
  } from '@mantine/core';

  import VanLifeLogo from "../../public/static/vanlife_logo.png"
  import Image from 'next/image';
  import Link from 'next/link';

  import { UserMenu } from './UserMenu';

  import classes from '../modules/Header.module.css';

  export default function Header({user}) {
    return (
        <header className={classes.header}>
          <Group h="100%">
            <Link href="/" className={classes.logo}>
                <Image className={classes.logo__size} src={VanLifeLogo} alt="The text logo of #VANLIFE in bolded, capitalized letters." />
            </Link>
                <Group h="100%" ml="auto">
                    <Link href="/vans" className={classes.link}>
                        Explore Vans
                    </Link>
                    <Link href="/about" className={classes.link}>
                        About
                    </Link>
                </Group>

                {
                    user ?
                        <UserMenu user={user}/>
                    :
                    <Group>
                        <Link href="/login" className={classes.auth}>
                            <Button variant="default">Log in</Button>
                        </Link>
                        <Link href="/signup" className={classes.auth}>
                            <Button color="yellow">Sign up</Button>
                        </Link>
                    </Group>
                }
          </Group>
        </header>
    );
  }
