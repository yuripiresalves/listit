package br.com.listit.listit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.listit.listit.domain.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>  {
	@Query("SELECT u FROM User u WHERE u.username = :username and u.password = :password")
	Optional<User> findByUsernameAndPassword(String username, String password);
	
	Optional<User> findByUsername(String username);
}
