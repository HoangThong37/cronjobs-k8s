package com.laptrinhjavaweb.repository.impl;

import com.laptrinhjavaweb.entity.UserEntity;
import com.laptrinhjavaweb.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Override
    public UserEntity findOneByUserNameAndStatus(String name, int status) {
        return null;
    }

    @Override
    public Page<UserEntity> findByUserNameContainingIgnoreCaseOrFullNameContainingIgnoreCaseAndStatusNot(String userName, String fullName, int status, Pageable pageable) {
        return null;
    }

    @Override
    public Page<UserEntity> findByStatusNot(int status, Pageable pageable) {
        return null;
    }

    @Override
    public long countByUserNameContainingIgnoreCaseOrFullNameContainingIgnoreCaseAndStatusNot(String userName, String fullName, int status) {
        return 0;
    }

    @Override
    public long countByStatusNot(int status) {
        return 0;
    }

    @Override
    public UserEntity findOneByUserName(String userName) {
        return null;
    }

    @Override
    public List<UserEntity> getAllUsers(Pageable pageable) {
        return Collections.emptyList();
    }

    @Override
    public int countTotalItem() {
        return 0;
    }
}
