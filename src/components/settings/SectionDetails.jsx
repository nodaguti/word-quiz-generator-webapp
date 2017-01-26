import React, { PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import { translate } from 'react-i18next';

const sectionDetails = ({ sections, sectioningRule, t }) => (
  <Card style={{ width: '70%', margin: '0 auto' }}>
    <CardText>
      <h2>{t('labels.aboutSectioning')}</h2>
      <h3>{t('labels.sectionRange')}</h3>
      <p>{sections}</p>
      <h3>{t('labels.sectioningRule')}</h3>
      <p>{sectioningRule}</p>
    </CardText>
  </Card>
);

sectionDetails.propTypes = {
  sections: PropTypes.string.isRequired,
  sectioningRule: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(sectionDetails);
