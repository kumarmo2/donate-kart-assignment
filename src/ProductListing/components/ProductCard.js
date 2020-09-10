import React from "react";
import { Card, CardMedia, makeStyles, CardContent } from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 140,
    width: 140,
  },
});

const ProductCard = ({ name, imageUrl, price }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia className={classes.media} image={imageUrl} title={name} />
      <CardContent>
        {name}, {Math.round(price)}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
