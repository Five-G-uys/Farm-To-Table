import React from 'react';
import UpcomingDirectionsListEntry from './UpcomingDirectionsListEntry';
const UpcomingOrderDirectionsList = ({ popupInfo }: any) => {
  const { steps }: any = popupInfo;
  console.log('LINE 6 || UPCOMING ORDERS DIRECTIONS || POPUPINFO', steps);

  return (
    <div>
      {steps.map((step: any, i: any) => {
        // console.log('LINE 13 || DIRECTIONS LIST || i', i);
        // console.log(
        //   'LINE 14 || DIRECTIONS LIST || STEP',
        //   step.maneuver.instruction,
        // );
        return (
          <UpcomingDirectionsListEntry
            step={step}
            key={step.maneuver.instruction + i}
            i={i}
          />
        );
      })}
    </div>
  );
};

export default UpcomingOrderDirectionsList;
