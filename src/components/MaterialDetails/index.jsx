import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import CSS from './index.css';

export default class MaterialDetails extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    ansLang: PropTypes.string.isRequired,
    coverImg: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string.isRequired,
  };

  createHeader() {
    const {
      name,
      coverImg,
    } = this.props;

    if (coverImg) {
      return (
        <CardMedia
          overlay={<CardTitle title={name} />}
          mediaStyle={{ textAlign: 'center' }}
        >
          <img src={coverImg} className={CSS.coverImg} />
        </CardMedia>
      );
    }

    return (
      <CardTitle
        title={name}
      />
    );
  }

  createActions() {
    const { url } = this.props;

    if (!url) {
      return null;
    }

    return (
      <CardActions>
        <FlatButton
          linkButton
          primary
          label="Visit Homepage"
          href={url}
        />
      </CardActions>
    );
  }

  render() {
    const {
      lang,
      ansLang,
      description,
    } = this.props;

    return (
      <Card style={{ width: '70%', margin: '0 auto' }}>
        {this.createHeader()}
        <CardText>
          <h3>Word/Phrase Language</h3>
          <p>{lang}</p>

          <h3>Answer Language</h3>
          <p>{ansLang}</p>

          <h3>About This Material</h3>
          <p>{description}</p>
        </CardText>
        {this.createActions()}
      </Card>
    );
  }
}
