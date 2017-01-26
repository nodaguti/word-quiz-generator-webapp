import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'react-i18next';
import CSS from './index.css';

class MaterialDetails extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    ansLang: PropTypes.string.isRequired,
    coverImg: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    coverImg: '',
    url: '',
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
          <img
            src={coverImg}
            className={CSS.coverImg}
            alt={`The cover of "${name}"`}
          />
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
    const {
      url,
      t,
    } = this.props;

    if (!url) {
      return null;
    }

    return (
      <CardActions>
        <FlatButton
          linkButton
          primary
          label={t('labels.visitHomepage')}
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
      t,
    } = this.props;

    return (
      <Card style={{ width: '70%', margin: '0 auto' }}>
        {this.createHeader()}
        <CardText>
          <h3>{t('labels.wordLang')}</h3>
          <p>{t(`langs.${lang}`)}</p>

          <h3>{t('labels.ansLang')}</h3>
          <p>{t(`langs.${ansLang}`)}</p>

          <h3>{t('labels.aboutMaterial')}</h3>
          <p>{description}</p>
        </CardText>
        {this.createActions()}
      </Card>
    );
  }
}

export default translate()(MaterialDetails);
