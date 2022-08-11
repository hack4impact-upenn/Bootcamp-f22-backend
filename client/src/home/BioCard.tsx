/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import profile from './ziya profile.jpeg';

/** Frontend Task
 * Make a card with some basic biographical information about yourself!
 * Include an image, your name, a bio, and whatever else you want to add (maybe a link to your Twitter?)
 * You don't have to use Material UI, but it will definitely make your life easier :)
 * It's also the library that you'll eventually use for H4I projects
 * For a starting point, check out the Material UI docs here: https://mui.com/material-ui/react-card/
 */

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="400"
        image={profile}
        alt="image of Ziya Xu"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ziya Xu
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ziya joined Hack4Impact in Fall 2020! She has been a project manager
          for 2 clients, and is currently the community chair.
        </Typography>
      </CardContent>
    </Card>
  );
}
