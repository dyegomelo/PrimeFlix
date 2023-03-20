import {useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css';
import {toast} from 'react-toastify'


export default function Filme(){

const [filme,setFilme] =useState({});
const [loading,setLoading] = useState(true);
const navigate = useNavigate();

    const {id} = useParams() //usa o param ID, q declarou la no link do home
    useEffect(()=>{
        async function loadFilme(){//qndo abrir a aplicação, executa essa função
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "d0313c3a7bffc695e8bc3edecf07bf94",
                    language:"pt-BR",
                }
            })
            .then((response)=>{ //em caso de acerto:
                setFilme(response.data) //mostra os dados do filme
                setLoading(false); // tira o loading
            })
            .catch(()=>{
                navigate("/",{replace: true}); //redireciona p pag de home
                return;
            })
        }
        loadFilme();
        return() =>{
            console.log('componente desmontado!!')
        }
    },[navigate,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix")//busca alista de filmes, se tiver algo coloca dentro do let abaixo
        let filmesSalvos = JSON.parse(minhaLista) || [];//converte devoltap lista
        const hasFilmes = filmesSalvos.some((filmeSalvo)=>filmeSalvo.id === filme.id)//visualiza se tem filmes, e evitar salvar filmes iguais(com msm id)
        if(hasFilmes){
            toast.warn('Esse filme já está na lista!') //alerta de erro
            return;
        }
        filmesSalvos.push(filme)//caso n tenha filme reptido, coloca mais um item nno array
        localStorage.setItem("@primeFlix",JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhess!!</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
          <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
        <h3>Sinopse do filme</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average}/10</strong>
       
       <div className='area-btn'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
            <a target="_blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
        </button>
       </div>
        </div>
    )
}
/*  <a  target="_blank" rel="external" ref={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>*/
/*esse link leva para o ytb as busca do nomedo filme e trailer/ o target serve p abrir em outra aba*/