import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from ".";

describe('Testando o componente Navbar', () => {
  const renderNavbar = () => render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );


  it('deve renderizar corretamente o componente', () => {
    renderNavbar();
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

  });
  it('deve exibir o logo e o nome da marca', () => {
    renderNavbar();
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    const marca = screen.getByText('Perfect');
    expect(marca).toBeInTheDocument();
  });

  it('deve mostrar o icone hamburger quando a tela é pequena', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    renderNavbar();
    const hamburgerIcon = screen.getByTestId('menu-toggle');
    expect(hamburgerIcon).toBeInTheDocument();
  });

it('Não deve mostrar o icone hamburger quando a tela é grande', () => {
    global.innerWidth = 1200;
    global.dispatchEvent(new Event('resize'));
    renderNavbar();
    const hamburgerMenu = screen.queryByTestId('menu-toggle');
    expect(hamburgerMenu).not.toBeInTheDocument();
  });

  it('Ao clicar no ícone hamburger, o menu deve abrir', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    renderNavbar();
    const hamburgerMenu = screen.getByTestId('menu-toggle');
    fireEvent.click(hamburgerMenu);
    const menu = screen.getByRole('navigation');
    expect(menu).toBeInTheDocument();
  });
});