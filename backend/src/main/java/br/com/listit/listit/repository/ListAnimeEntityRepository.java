package br.com.listit.listit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.listit.listit.domain.entity.ListAnimeEntity;

@Repository
public interface ListAnimeEntityRepository extends JpaRepository<ListAnimeEntity, Integer>{

}
