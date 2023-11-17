import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import image from './image.svg';
import classes from '../modules/SelfPromo.module.css';

export default function SelfPromo() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Enjoying the website?</Title>
        <Text fw={500} fz="lg" mb={5}>
          I'm looking for work!
        </Text>
        <Text fz="sm" c="dimmed">
          A website like this and more could all be yours, send me an email if you're interested in creating something beautiful with me.
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control} color="yellow">Send</Button>
        </div>
      </div>
      {/* <Image src={image.src} className={classes.image} /> */}
    </div>
  );
}
