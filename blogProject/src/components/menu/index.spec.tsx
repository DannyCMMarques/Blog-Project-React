import { MemoryRouter } from "react-router-dom";
import Menu from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import menuContentItens from "../../utils/content/menuContentItens";


const getNavLinkStyle = () => ({ fontWeight: 800, color: "#c96b5f" });

describe('Testando o componente Menu', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Menu getNavLinkStyle={getNavLinkStyle} />
      </MemoryRouter>
    );
  });

  it('deve renderizar corretamente o nav e a minha listagem', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('deve renderizar todos os links', () => {
    const menuItems = screen.getAllByRole('link');
    expect(menuItems).toHaveLength(menuContentItens.length);
  });

  it('cada link possui o texto e href corretos', () => {
    menuContentItens.forEach(item => {
      const menuItem = screen.getByRole('link', { name: item.title });
      expect(menuItem).toHaveAttribute('href', item.href);
    });
  });

  it('deve aplicar o estilo correto ao link ativo', () => {
    const menuSelecionado = screen.getByRole('link', { name: menuContentItens[0].title });
    fireEvent.click(menuSelecionado);
    expect(menuSelecionado).toHaveStyle({ fontWeight: 800, color: "#c96b5f" });
  });

});