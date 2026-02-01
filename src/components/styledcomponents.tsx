import styled from 'styled-components';

// Estilos generales de textoHome
export const TextHome = styled.p`
  color: #ffffff; 
  text-align:left;
  margin-bottom: 30px;
  font-family: 'Sora', sans-serif;
  font-size: 28px;
  font-weight: bold;
  
  @media (max-width: 700px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

// Estilos generales de botones
const buttonVariants = {
  purple: {
    bgColor: '#a71fd0',
    textColor: '#fff',
    hoverColor: '#7f00a5',
    padding: '10px 20px',
  },
  gray: {
    bgColor: '#2D2D2D',
    textColor: '#fff',
    hoverColor: '#a71fd0',
    padding: '10px 20px',
  },
  grayhome: {
    bgColor: '#2D2D2D',
    textColor: '#fff',
    hoverColor: '#40C485',
    padding: '10px 20px',
  },
  green: {
    bgColor: '#40C485',
    textColor: '#fff',
    hoverColor: '#008f4a',
    padding: '10px 20px',
  },
  white: {
    bgColor: '#ffffff',
    textColor: '#000000',
    hoverColor: '#898989',
    padding: '10px 30px',
  },
};

export const Button = styled.button<{ variant: 'purple' | 'gray' | 'green' | 'white' | 'grayhome'; disabled?: boolean }>`
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.disabled ? '#BABABA' : buttonVariants[props.variant].textColor};
  background-color: ${(props) => props.disabled ? '#5C1D71' : buttonVariants[props.variant].bgColor};
  border: none;
  border-radius: 10px;
  padding: ${(props) => buttonVariants[props.variant].padding};
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => !props.disabled && buttonVariants[props.variant].hoverColor};
  }
`;

const buttonVariantsForm = {
  purpleForm: {
    bgColor: '#a71fd0',
    textColor: '#fff',
    hoverColor: '#7f00a5',
    padding: '10px 20px',
  },
  grayForm: {
    bgColor: '#2D2D2D',
    textColor: '#fff',
    hoverColor: '#a71fd0',
    padding: '10px 20px',
  },
  grayhomeForm: {
    bgColor: '#2D2D2D',
    textColor: '#fff',
    hoverColor: '#40C485',
    padding: '10px 20px',
  },
  greenForm: {
    bgColor: '#40C485',
    textColor: '#fff',
    hoverColor: '#008f4a',
    padding: '10px 20px',
  },
  orangeForm: {
    bgColor: '#F88108',
    textColor: '#fff',
    hoverColor: '#C83D02',
    padding: '10px 20px',
  },
  whiteForm: {
    bgColor: '#ffffff',
    textColor: '#000000',
    hoverColor: '#AFAFAF',
    padding: '10px 30px',
  },
};

export const ButtonForm = styled.button<{ variant: 'purpleForm' | 'grayForm' | 'greenForm' | 'whiteForm'| 'grayhomeForm' | 'orangeForm' }>`
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => buttonVariantsForm[props.variant].textColor};
  background-color: ${(props) => buttonVariantsForm[props.variant].bgColor};
  border: none;
  border-radius: 10px;
  padding: ${(props) => buttonVariantsForm[props.variant].padding};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: ${(props) => buttonVariantsForm[props.variant].hoverColor};
    transition: left 0.5s ease;
    z-index: -1;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    color: ${(props) => buttonVariantsForm[props.variant].textColor};
  }

  @media (max-width: 700px) {
    font-size: 14px;
    padding: 4px 10px;
  }
`;

// Estilo generales inputs
const inputVariants = {
  searchwhite: {
    textColor: '#2D2D2D',
    borderRadius: '10px', 
    borderBottom: 'transparent',
    bgColor: '#ffffff',
    width: '90%',
    fontWeight: 'normal', 
    fontSize: {
      default: '19px',   
      small: '16px',
    } 
  },
  searchgray: {
    textColor: '#ffffff',
    borderRadius: '10px',
    borderBottom: 'transparent',
    bgColor: '#2D2D2D',
    width: '90%',
    fontWeight: 'normal',
    fontSize: {
      default: '20px',   
      small: '16px',
    } 
  },
  boxwhite: {
    textColor: '#2D2D2D',
    borderRadius: '10px',
    borderBottom: 'transparent',
    bgColor: '#ffffff',
    width: '70%',
    fontWeight: 'normal',
    fontSize: {
      default: '20px',   
      small: '16px',
    } 
  },
  borderpurple: {
    textColor: '#ffffff',
    borderRadius: '20px',
    borderBottom: '2px solid #a71fd0',
    bgColor: '#2D2D2D',
    width: '70%',
    fontWeight: '600',
    fontSize: {
      default: '32px',   
      small: '24px',
    }
  },
  search: {
    textColor: '#2D2D2D',
    borderRadius: '30px', 
    borderBottom: 'transparent',
    bgColor: '#ffffff',
    width: '90%',
    fontWeight: 'normal', 
    fontSize: {
      default: '18px',   
      small: '14px',
    } 
  },
  inputform: {
    textColor: '#2D2D2D',
    borderRadius: '10px', 
    borderBottom: 'transparent',
    bgColor: '#ffffff',
    width: '20vw',
    fontWeight: 'normal', 
    fontSize: {
      default: '15px',   
      small: '12px',
    } 
  },
  inputdescription: {
    textColor: '#2D2D2D',
    borderRadius: '10px', 
    borderBottom: 'transparent',
    bgColor: '#ffffff',
    width: '90%',
    fontWeight: 'normal', 
    fontSize: {
      default: '15px',   
      small: '12px',
    } 
  },
};

export const Input = styled.input<{ variant: 'searchwhite' | 'searchgray' | 'boxwhite' | 'borderpurple'| 'search' | 'inputform' | 'inputdescription'}>`
  width: ${(props) => inputVariants[props.variant].width};
  padding: 10px 20px;
  border-radius: ${(props) => inputVariants[props.variant].borderRadius};
  border: none;
  border-bottom: ${(props) => inputVariants[props.variant].borderBottom};
  background-color: ${(props) => inputVariants[props.variant].bgColor};
  color: ${(props) => inputVariants[props.variant].textColor};
  font-family: 'Sora', sans-serif;
  font-size: ${(props) => inputVariants[props.variant].fontSize.default};  
  font-weight: ${(props) => inputVariants[props.variant].fontWeight}; 

  &:focus {
    outline: 2px solid #a71fd0;
  }

  @media (max-width: 700px) {
    margin: 10px;
    font-size: ${(props) => inputVariants[props.variant].fontSize.small};
  }
`;

// Estilos generales de texto
const textVariants = {
  white: {
    textColor: '#ffffff',
    fontSize: {
      default: '14px',
      small: '14px',
    }
  },
  purple: {
    textColor: '#a71fd0',
    fontSize: {
      default: '16px',
      small: '14px',
    }
  },
  green: {
    textColor: '#40C485',
    fontSize: {
      default: '14px',
      small: '12px',
    }
  },
  gray: {
    textColor: '#D2D2D2',
    fontSize: {
      default: '16px',
      small: '14px',
    }
  },
};

export const Tittle = styled.h1<{ variant: 'white' | 'purple' }>`
  color: ${(props) => textVariants[props.variant].textColor}; 
  text-align:left;
  margin-bottom: 20px;
  font-family: 'Sora', sans-serif;
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 700px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const Text = styled.p<{ variant: 'white' | 'purple'| 'green' | 'gray' }>`
  color: ${(props) => textVariants[props.variant].textColor}; 
  text-align:left;
  font-family: 'Sora', sans-serif;
  font-size: ${(props) => textVariants[props.variant].fontSize.default};
  font-weight: 500;
  margin: 0px;

  @media (max-width: 700px) {
    font-size: ${(props) => textVariants[props.variant].fontSize.small};
  }
`;

export const TextLogo = styled.p`
  color: #ffffff; 
  text-align:left;
  font-family: 'Fuente Logo', sans-serif;
  font-size: 50px;
  font-weight: normal;
  margin:0%;

  @media (max-width: 700px) {
    font-size: 35px;
  }
`;

// Estilos generales de contenedores (divs)
const divVariants = {
  bigopacity: {
    padding: {
      default: '30px',   
      small: '20px',
    },
    backgroundColor: 'rgba(16, 15, 15, 0.5)',  
  },
  smallopacity: {
    padding: {
      default: '35px',   
      small: '20px',
    },
    backgroundColor: 'rgba(16, 15, 15, 0.8)',  
  },
  big: {
    padding: {
      default: '30px',   
      small: '20px',
    },
    backgroundColor: '#2D2D2D', 
  },
  small: {
    padding: {
      default: '15px',   
      small: '8px',
    },
    backgroundColor: '#2D2D2D',  
  },
  profile: {
    padding: {
      default: '40px 30px 0px 30px',   
      small: '8px',
    },
    backgroundColor: '#2D2D2D',  
  },
};

export const Container = styled.div<{ variant: 'bigopacity' | 'smallopacity' | 'big' | 'small' | 'profile'}>`
  padding: ${(props) => divVariants[props.variant].padding.default};
  background-color: ${(props) => divVariants[props.variant].backgroundColor};
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 700px) {
    padding: ${(props) => divVariants[props.variant].padding.small};
    border-radius: 10px;
  }
`;

export const StyledHr = styled.hr`
  border: 1.6px solid #A82CD4;
  margin: 20px 0;
  width: 100%;
`;