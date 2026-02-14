import React, { useState } from 'react';
import type { Product } from '../types/product';
import { cartService } from '../utils/cart';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import { Button, Text } from './styledcomponents';

const CardWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  height: 240px;
  background: linear-gradient(145deg, #1F1F1F, #111111);
  border-radius: 14px;
  border: 1px solid rgba(167, 31, 208, 0.15);
  overflow: visible;
  box-shadow: 0 6px 24px rgba(0,0,0,0.6);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 0;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(167, 31, 208, 0.35);
  }

  @media (max-width: 700px) {
    max-width: 100%;
    height: auto;
    flex-direction: column;
  }
`;

const ImageArea = styled.div`
  position: relative;
  width: 180px;
  height: 100%;
  border-radius: 14px 0 0 14px;
  overflow: hidden;
  flex-shrink: 0;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://i.pinimg.com/736x/ff/90/cd/ff90cdcaf64d339764f2458da44d7caa.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(4px) brightness(0.5);
    z-index: 0;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 170px;
    border-radius: 14px 14px 0 0;
  }
`;

const CardImage = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
  display: block;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  ${CardWrapper}:hover & {
    transform: translate(-50%, -50%) scale(1.06);
  }
`;

const CategoryBox = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  background: linear-gradient(135deg, rgba(167, 31, 208, 0.95), rgba(255, 107, 157, 0.9));
  backdrop-filter: blur(10px);
  color: white;
  font-size: 10px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 18px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 16px rgba(167, 31, 208, 0.4);
  z-index: 2;
`;

const ContentBox = styled.div`
  flex: 1;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(31,31,31,0.9), #1F1F1F);
  overflow: hidden;

  @media (max-width: 700px) {
    padding: 20px;
  }
`;

const TitleBox = styled.div`
  margin-bottom: 16px;
  flex-shrink: 0;
`;

const CardTitle = styled.h3`
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 10px 0;
  line-height: 1.25;
  word-break: break-word;
  overflow-wrap: break-word;
  max-height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

const CardDescription = styled.p`
  color: #D1D5DB;
  font-size: 13px;
  line-height: 1.45;
  max-height: 55px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;

  @media (max-width: 700px) {
    font-size: 12px;
    max-height: 45px;
    -webkit-line-clamp: 2;
  }
`;

const PriceButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
`;

const PriceBox = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 22px;
  font-weight: 900;
  background: linear-gradient(135deg, #a71fd0 0%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin: 0;
  width: 100%;
  
  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

const BuyButton = styled(Button)`
  font-size: 12px;
  padding: 8px 20px;
  width: 100%;
`;

// Modal Styles
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  background: linear-gradient(145deg, #1F1F1F, #111111);
  border-radius: 20px;
  border: 1px solid rgba(167, 31, 208, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  width: 600px;
  padding: 30px;
  position: relative;
  box-shadow: 0 20px 60px rgba(167, 31, 208, 0.4);
  animation: ${scaleIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-y: auto;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.8)'};

  @media (max-width: 700px) {
    width: 95vw;
    padding: 20px;
    margin: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(167, 31, 208, 0.2);
  border: 1px solid rgba(167, 31, 208, 0.4);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(167, 31, 208, 0.4);
    transform: scale(1.1);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-family: 'Sora', sans-serif;
  font-size: 24px;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 10px 0;
  line-height: 1.2;
`;

const ModalDescription = styled.p`
  color: #D1D5DB;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const ModalPrice = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(135deg, #a71fd0 0%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalImage src={product.image_url} alt={product.name} />
        <ModalTitle>{product.name}</ModalTitle>
        <ModalDescription>{product.description}</ModalDescription>
        <ModalPrice>{formattedPrice}</ModalPrice>
        <ModalButtons>
          <BuyButton variant="green" onClick={onAddToCart} style={{ flex: 1 }}>
            Agregar al carrito
          </BuyButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    cartService.addToCart(product);
    toast.success(`¡${product.name} agregado al carrito!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // No abrir modal si se hace clic en el botón comprar
    if (e.target instanceof Element && e.target.closest('button')) return;
    setIsModalOpen(true);
  };

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <>
      <CardWrapper className={className} onClick={handleCardClick}>
        <ImageArea>
          <CardImage src={product.image_url} alt={product.name} />
          <CategoryBox>{product.category}</CategoryBox>
        </ImageArea>
        
        <ContentBox>
          <TitleBox>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </TitleBox>
          
          <PriceButtonBox>
            <PriceBox>{formattedPrice}</PriceBox>
            <BuyButton variant="green" onClick={handleAddToCart}>
              Comprar
            </BuyButton>
          </PriceButtonBox>
        </ContentBox>
      </CardWrapper>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductCard;
