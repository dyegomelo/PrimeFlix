import {useEffect,useState} from 'react'
import './favoritos.css';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
export default function Favoritos(){
    const [filmes,setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(minhaLista) || []) // o setfilmes recebe o array, ai nele contera os filmes, ou nenhum filme
    },[])
    
    function excluirFilme(id){
       let filtroFilmes = filmes.filter((filme)=>{ //filtra os filme da lista de favoritos  
           return (filme.id !== id) //retornará tds id dos filmes, exceto aql que foi clicado em excluir
       })
       setFilmes(filtroFilmes);
       localStorage.setItem('@primeFlix',JSON.stringify(filtroFilmes))
       toast.success("Filme excuido com sucesso :)")
    }

return(
    <div className='meus-filmes'>
        <h1 >Meuss Filmes</h1>
        {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
        <ul>
            {filmes.map((filme)=>{ //passara pelos filmes da lista 
                return(
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filme/${filme.id}`}>Ver detalhess</Link>
                       <button onClick={()=>excluirFilme(filme.id)}>Excluir</button> 
                        </div>
                    </li>
                ) //qndo apertar no botar de excuir filme, ele pegara o id dql filme
            })}
        </ul>
    </div>
)
}