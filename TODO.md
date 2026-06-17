Agora você tem tudo que precisa para usar em qualquer página. Por exemplo, numa página restrita a gerentes:

export default function UsersPage() {
const { user, isManager } = useRequireRole('manager');

if (!isManager) return null;

return (
// conteúdo da página
);
}

E para mostrar/esconder botões baseado no role em qualquer componente:

const { isManager } = useAuthStore(state => ({ isManager: state.isManager() }));

{isManager && <Button>Cadastrar produto</Button>}

E para o logout, use assim no seu header ou sidebar:
const { logout } = useLogout();

<Button onClick={logout}>Sair</Button>
