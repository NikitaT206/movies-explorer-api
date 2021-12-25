const validationMessages = {
  requiredField: 'Обязательное поле',
  incorrectURL: 'Введен некорректный URL',
};

const userErrorMessages = {
  enterPassword: 'Введите пароль',
  conflict: 'Пользователь с указанным email уже существует',
  unauthorized: 'Неправильные почта или пароль',
  needAuth: 'Необходима авторизация',
  incorrectData: 'Переданы некорректные данные',
  incorrectId: 'Проверьте правильность ввода id',
  enterNewEmail: 'Введите новый email',
  enterNewName: 'Введите новое имя',
  required: 'Поля email и name должны быть заполнены',
  notFoundId: 'Пользователя с таким id не существует',
};

const movieErrorMessages = {
  incorrectId: 'Проверьте правильность ввода id',
  notFoundId: 'Фильма с таким id не существует',
  forbidden: 'Вы не можете удалять чужие фильмы',
};

const serverErrorMessages = {
  notFound: 'Запрашиваемый ресурс не найден',
  serverError: 'На сервере произошла ошибка',
};

module.exports = {
  validationMessages,
  userErrorMessages,
  movieErrorMessages,
  serverErrorMessages,
};
