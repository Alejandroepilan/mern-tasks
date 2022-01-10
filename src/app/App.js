import M from 'minimatch';
import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            tittle: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
                .then(data => {
                    //console.log(data)
                    window.M.toast({html: 'Tarea actualizada'});
                    this.setState({tittle: '', description: '', _id: ''});
                    this.fetchTasks();
                });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data)
                    window.M.toast({html: 'Tarea guardada'});
                    this.setState({tittle: '', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }

        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                //console.log(this.state.tasks);
            });
    }

    deleteTask(_id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            fetch(`/api/tasks/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                window.M.toast({html: 'Tarea eliminada'});
                this.fetchTasks();
            });
        }
    }

    editTask(_id) {
        fetch(`/api/tasks/${_id}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    tittle: data.tittle,
                    description: data.description,
                    _id: data._id
                })
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/* MENU NAVEGACION */}
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href=''>MERN Stack</a>
                    </div>
                </nav>

                {/* MENU CREACION TAREA */}
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='tittle' onChange={this.handleChange} value={this.state.tittle} type="text" placeholder="Título de la tarea"/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name='description' onChange={this.handleChange} value={this.state.description} placeholder='Descripción de la tarea' className='materialize-textarea'></textarea>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn darken-4'>
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* TABLA DE TAREAS */}
                        <div className='col s7'>
                            <table className='highlight '>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.tittle}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className='waves-effect waves-light btn' onClick={() => this.editTask(task._id)} >
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                        <button className='waves-effect waves-light btn' onClick={() => this.deleteTask(task._id)} style={{marginLeft: '4px'}} >
                                                        <i className='material-icons'>delete</i>
                                                        </button>
                                                    </td>
                                                </tr> 
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;