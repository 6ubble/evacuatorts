import * as yup from 'yup'

export const orderFormSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(15, 'Имя не должно превышать 15 символов')
    .matches(/^[а-яёА-ЯЁ\s-]+$/, 'Имя может содержать только русские буквы, пробелы и дефисы'),
  
  phone: yup
    .string()
    .required('Номер телефона обязателен для заполнения')
    .matches(/^\+7[0-9]{10}$/, 'Номер должен быть в формате +7XXXXXXXXXX (10 цифр после +7)')
    .max(12, 'Номер телефона должен содержать ровно 12 символов (+7 и 10 цифр)'),
  
  vehicleType: yup
    .string()
    .required('Выберите тип транспорта'),
  
  location: yup
    .string()
    .required('Место эвакуации обязательно для заполнения')
    .min(1, 'Адрес должен содержать минимум 1 символ')
    .max(100, 'Адрес не должен превышать 100 символов'),
  
  description: yup
    .string()
    .max(500, 'Описание не должно превышать 500 символов')
    .required('Описание обязательно для заполнения')
})

export type OrderFormSchema = yup.InferType<typeof orderFormSchema>
