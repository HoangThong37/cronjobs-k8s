package com.laptrinhjavaweb.repository;

import com.laptrinhjavaweb.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserRepository extends UserRepositoryCustom {
    UserEntity findOneByUserNameAndStatus(String name, int status);

    Page<UserEntity> findByUserNameContainingIgnoreCaseOrFullNameContainingIgnoreCaseAndStatusNot(String userName, String fullName, int status,
                                                                                                  Pageable pageable);

    Page<UserEntity> findByStatusNot(int status, Pageable pageable);

    long countByUserNameContainingIgnoreCaseOrFullNameContainingIgnoreCaseAndStatusNot(String userName, String fullName, int status);

    long countByStatusNot(int status);

    UserEntity findOneByUserName(String userName);

    List<UserEntity> getAllUsers(Pageable pageable);

    int countTotalItem();
}

// extends JpaRepository<UserEntity, Long>
