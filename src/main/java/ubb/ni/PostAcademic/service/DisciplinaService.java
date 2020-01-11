package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.DisciplinaRepo;
import ubb.ni.PostAcademic.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class DisciplinaService {
    @Autowired
    DisciplinaRepo disciplinaRepo;
    @Autowired
    UserService userService;


    public void addMateriiToContract(User user, ArrayList<String> materii){
        Student student = userService.getStudentByUsername(user.getUsername());

        if(user.getAccountType().equals(AccountType.student)){
            for(ContractStudii c : student.getContracteStudii()){
                if(c.getAnStart() == student.getAnulInscrierii() +  (student.getSemestru()-1)/2){
                    c.getDiscipline().clear();

                    for(String materie : materii){
                        Disciplina disciplina =findDisciplina(materie);
                        if(disciplina!=null)
                            c.getDiscipline().add(disciplina);
                    }
                }
            }
        }
    }


    public Disciplina findDisciplina(String cod_disciplina){
        for(Disciplina d: disciplinaRepo.findAll()){
            if(d.getCodDisciplina().equals(cod_disciplina)){
                return d;
            }
        }
        return null;
    }

    public ArrayList<Disciplina> getDisciplineBySemestru(User user, String semestru){
        ArrayList<Disciplina> discipline = new ArrayList<>();

        Student student = userService.getStudentByUsername(user.getUsername());

        if(user.getAccountType().equals(AccountType.student)){
            for(ContractStudii c : student.getContracteStudii()){
                if(c.getAnStart() == student.getAnulInscrierii() + (student.getSemestru()-1)/2){
                    for(Disciplina d : c.getDiscipline()){
                        if(d.getSemestru() == Integer.parseInt(semestru)){
                            discipline.add(d);
                        }
                    }
                }
            }

        }

        return discipline;
    }

//    public ArrayList<Disciplina> getAllDisciplineBySemestru(User user, String semestru){
//        ArrayList<Disciplina> discipline = new ArrayList<>();
//
//        Student student = userService.getStudentByUsername(user.getUsername());
//
//        if(user.getAccountType().equals(AccountType.student)){
//            for(Disciplina d : disciplinaRepo.findAll()){
//                if(d.getTipDisciplina().equals(TipDisciplina.obligatorie) && d.getSpecializare().equals(student.getGrupa().getSpecializare()) && d.getSemestru() == Integer.parseInt(semestru)){
//                    discipline.add(d);
//                }
//            }
//        }
//
//        return discipline;
//    }

    public ArrayList<Disciplina> getDisciplineBySpecializareAndSemestru(User user, String specializare, String semestru){
        ArrayList<Disciplina> discipline = new ArrayList<>();

        if(user.getAccountType().equals(AccountType.student)){
            for(Disciplina d : disciplinaRepo.findAll()){
                if(d.getSpecializare().getNume().equals(specializare) && d.getSemestru().equals(Integer.parseInt(semestru))){
                    discipline.add(d);
                }
            }
        }
        return discipline;
    }

    public ArrayList<Disciplina> getOptionalByPachet(User user, String pachet){
        ArrayList<Disciplina> discipline = new ArrayList<>();

        if(user.getAccountType().equals(AccountType.student)){
            for(Disciplina d : disciplinaRepo.findAll()){
                if(d.getTipDisciplina().equals(TipDisciplina.optionala) && d.getPachet().equals(pachet)){
                    discipline.add(d);
                }
            }
        }

        return discipline;
    }

}
