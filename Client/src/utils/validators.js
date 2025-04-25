// utils/validators.js
import * as Yup from 'yup';

// Schéma de validation pour l'inscription
export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
    
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
    
  password: Yup.string()
    .required('Mot de passe requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Confirmation du mot de passe requise')
});

// Schéma de validation pour la connexion
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
    
  password: Yup.string()
    .required('Mot de passe requis')
});

// Schéma de validation pour les articles
export const articleValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Le titre est requis')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
    
  content: Yup.string()
    .required('Le contenu est requis')
    .min(50, 'Le contenu doit contenir au moins 50 caractères'),
    
  categoryId: Yup.string()
    .required('La catégorie est requise'),
    
  image: Yup.string()
    .url('Doit être une URL valide')
    .nullable()
});

// Schéma de validation pour les commentaires
export const commentValidationSchema = Yup.object().shape({
  content: Yup.string()
    .required('Le commentaire ne peut pas être vide')
    .max(500, 'Le commentaire ne peut pas dépasser 500 caractères')
});

// Fonction utilitaire pour les messages d'erreur
export const getErrorMessage = (error) => {
  return error?.response?.data?.message || error.message || 'Une erreur est survenue';
};