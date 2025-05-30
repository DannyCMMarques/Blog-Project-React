package com.crud.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

import com.crud.demo.domain.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
