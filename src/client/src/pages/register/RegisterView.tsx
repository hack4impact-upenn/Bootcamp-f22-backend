import React from 'react';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';

function RegisterView() {
  return (
    <div
      style={{
        backgroundColor: COLORS.header,
        width: '100px',
        height: '100px',
        fontFamily: FONTS.headerFont,
        fontWeight: FONTS.headerWeight,
      }}
    >
      <h1>Hello!</h1>
    </div>
  );
}

export default RegisterView;
