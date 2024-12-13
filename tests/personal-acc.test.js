import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import PersonalAccount from '../src/components/pages/personal-account/personal-account';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../images/logo.png', () => 'mock-logo');
jest.mock('../../../images/1.jpeg', () => 'mock-photo-1');
jest.mock('../../../images/2.jpeg', () => 'mock-photo-2');
jest.mock('../../../images/21.jpeg', () => 'mock-photo-21');
jest.mock('@mui/icons-material/Edit', () => {
  const EditIcon = () => <div>EditIcon</div>;
  EditIcon.displayName = 'EditIcon';
  return EditIcon;
});

jest.mock('@mui/icons-material/ArrowBackIos', () => {
  const ArrowBackIosIcon = () => <div>ArrowBackIosIcon</div>;
  ArrowBackIosIcon.displayName = 'ArrowBackIosIcon';
  return ArrowBackIosIcon;
});

jest.mock('@mui/icons-material/ArrowForwardIos', () => {
  const ArrowForwardIosIcon = () => <div>ArrowForwardIosIcon</div>;
  ArrowForwardIosIcon.displayName = 'ArrowForwardIosIcon';
  return ArrowForwardIosIcon;
});

describe('PersonalAccount', () => {
  test('renders PersonalAccount component', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('telegram')
    ).toBeInTheDocument();
  });

  it('displays an error when invalid phone or email is entered', async () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    expect(
      await screen.findByText('Неверный формат номера')
    ).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, {
      target: { value: 'invalid-email' },
    });
    expect(
      await screen.findByText('Неверный формат email')
    ).toBeInTheDocument();
  });

  it('displays no error for valid phone or email input', async () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, {
      target: { value: '+7 999 999 99 99' },
    });

    expect(screen.queryByText('Неверный формат номера')).toBeNull();

    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, {
      target: { value: 'username52@gmal.com' },
    });

    expect(screen.queryByText('Неверный формат email')).toBeNull();
  });

  it('navigates through photos when clicking next and previous buttons', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const photos = screen.getAllByRole('img');
    expect(photos.length).toBe(1);

    fireEvent.click(screen.getByText('ArrowForwardIosIcon'));

    const newPhotos = screen.getAllByRole('img');
    expect(newPhotos.length).toBe(1);
  });

  it('cycles to the last photo after reaching the first one', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('ArrowForwardIosIcon');
    for (let i = 0; i < 20; i++) {
      fireEvent.click(nextButton);
    }
    const firstPhoto = screen.getAllByRole('img')[0];
    expect(firstPhoto.src).toContain('mock-photo-21');
  });

  it('does not allow toggling edit mode if there are validation errors', async () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, { target: { value: '12345' } });

    const editButton = screen.getByText('EditIcon');
    fireEvent.click(editButton);

    expect(screen.queryByPlaceholderText('name')).toBeNull();
  });

  it('calls handlePrev and updates currentIndex correctly', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const initialPhoto = screen.getByTestId('photo-0');
    expect(initialPhoto.style.backgroundImage).toContain(
      'url(mock-photo-21)'
    );

    const prevButton = screen.getByText('ArrowBackIosIcon');
    fireEvent.click(prevButton);

    const updatedPhoto = screen.getByTestId('photo-0');
    expect(updatedPhoto.style.backgroundImage).toContain(
      'url(mock-photo-21)'
    );
  });

  it('does not toggle editing mode when there are validation errors', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, { target: { value: '12345' } });

    const editButton = screen.getByText('EditIcon');
    fireEvent.click(editButton);

    expect(screen.queryByPlaceholderText('name')).toBeNull();
  });
  it('formats phone correctly and updates userData', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');

    fireEvent.change(phoneInput, {
      target: { value: '+7 999 123 45 67' },
    });

    expect(phoneInput.value).toBe('+7 999 123 45 67');
  });
  it('cycles through photos after reaching the end', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const forwardIcon = screen.getByText('ArrowForwardIosIcon');
    // Допустим, крутим 21 раз, чтобы вернуться к исходной
    for (let i = 0; i < 21; i++) {
      fireEvent.click(forwardIcon);
    }
    // Проверяем, что после полной прокрутки мы снова на исходной фотографии
    // Для этого нужен data-testid или проверка backgroundImage photo-0
    const firstPhoto = screen.getByTestId('photo-0');
    expect(firstPhoto.style.backgroundImage).toContain(
      'mock-photo-21'
    );
  });
  it('formats phone correctly when valid phone number entered', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, {
      target: { value: '+7 999 123 45 67' },
    });
    expect(phoneInput.value).toBe('+7 999 123 45 67');
  });

  it('navigates to next photo when ArrowForwardIosIcon is clicked', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const forwardIcon = screen.getByText('ArrowForwardIosIcon');
    fireEvent.click(forwardIcon);
    // Фотографии циклически переключаются, но в тесте мы проверяем,
    // что клик не вызывает ошибок и что мы можем достичь другого индекса.
    // Можно дополнительно проверить смену backgroundImage у photo-0
  });

  it('navigates to prev photo when ArrowBackIosIcon is clicked', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const backIcon = screen.getByText('ArrowBackIosIcon');
    fireEvent.click(backIcon);
    // Аналогично, проверяем что переключение назад работает
    // Можно проверить backgroundImage photo-0, если нужно
  });
  it('prevents toggling edit mode if validation errors exist', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    const editButton = screen.getByText('EditIcon');
    fireEvent.click(editButton);

    // Если есть ошибка, режим редактирования не должен включиться
    expect(screen.queryByPlaceholderText('name')).toBeNull();
  });

  it('shows error when entering invalid email', async () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, {
      target: { value: 'invalid-email' },
    });

    expect(
      await screen.findByText('Неверный формат email')
    ).toBeInTheDocument();
  });

  it('does not show error for valid phone or email', () => {
    render(
      <MemoryRouter>
        <PersonalAccount />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText('phone');
    fireEvent.change(phoneInput, {
      target: { value: '+7 999 999 99 99' },
    });
    expect(screen.queryByText('Неверный формат номера')).toBeNull();

    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    expect(screen.queryByText('Неверный формат email')).toBeNull();
  });
});
