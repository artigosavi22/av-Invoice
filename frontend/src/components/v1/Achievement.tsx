import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSmile, faBuilding, faTrophy, faThumbsUp } from '@fontawesome/free-solid-svg-icons';

// import '../../custom_styling/achievement.css';
import { achievement } from '../../models/v1/ILandingPage';

const achievements: achievement[] = [
  { icon: '', number: '20000+', title: 'Happy', subtitle: 'Clients' }, //faSmile
  { icon: '', number: '25+', title: 'Years', subtitle: 'Industry Experience' },//faBuilding
  { icon: '', number: '100+', title: 'Awards', subtitle: 'of Excellence' }, //faTrophy
  { icon: '', number: '1000+', title: 'Completed', subtitle: 'Projects' } //faThumbsUp
];

const Achievements: React.FC = () => {
  return (
    <div className="achievements-container">
      <h2 className="achievements-title">Achievements</h2>
      <div className="achievements">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement">
            {/* <FontAwesomeIcon icon={achievement.icon} className="achievement-icon" /> */}
            <div className="achievement-content">
              <div className="achievement-number">{achievement.number}</div>
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-subtitle">{achievement.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
