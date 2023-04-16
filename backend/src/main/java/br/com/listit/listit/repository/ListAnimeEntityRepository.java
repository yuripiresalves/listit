package br.com.listit.listit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.listit.listit.domain.entity.ListAnimeEntity;

public interface ListAnimeEntityRepository extends JpaRepository<ListAnimeEntity, Integer>{

}
