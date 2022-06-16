import React, { useEffect, useState } from 'react'
import ListaCategorias from '../components/ListaCategorias'
import '../assets/css/blog.css'
import ListaPost from '../components/ListaPost'
import { Link, Route, useParams, useRouteMatch} from 'react-router-dom'
import { busca } from '../api/api'

const Categoria = () => {
    const { id } = useParams()
    const { url, path } = useRouteMatch()
    const [subcategoria, setSubCategorias] = useState([])

    useEffect(() => {
        busca(`/categorias/${id}`, (categoria) => {
            setSubCategorias(categoria.subcategorias)
        })
    }, [id])
    return (
        <>
            <div className="container">
                <h2 className="titulo-pagina">Pet Notícias</h2>
            </div>

            <ListaCategorias />
            <ul className="lista-categorias container flex">
                {
                    subcategoria.map((subcategoria) => (
                        <li className={`lista-categorias__categoria 
                        lista-categorias__categoria--${id}`} key={subcategoria}>
                            <Link to={`${url}/${subcategoria}`}>
                                {subcategoria}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <Route exact path={`${path}/`}>
                <ListaPost url={`/posts?categoria=${id}`} />
            </Route>
        </>
    )
}

export default Categoria