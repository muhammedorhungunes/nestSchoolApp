import { Injectable } from '@nestjs/common';
import { students } from 'src/db';
import { CreateStudentDto, FindStudentResponseDto, StudentResponseDto, UpdateStudentDto } from './dto/student.dto';
import { v4 as uuid } from "uuid"

@Injectable()
export class StudentService {

    private students = students;

    getStudents(): FindStudentResponseDto[] {
        return this.students;
    }

    getStudentById(id: string): FindStudentResponseDto {
        return this.students.find(student => {
            return student.id === id;
        })
    }
    createStudent(payload: CreateStudentDto): StudentResponseDto {
        let newStudent = {
            id: uuid(),
            ...payload
        }

        this.students.push(newStudent)

        return newStudent
    }
    updateStudent(payload: UpdateStudentDto, id: string): StudentResponseDto {
        let updatedStudent: StudentResponseDto

        let updatedStudentList = this.students.map(student => {
            if(student.id === id){
                updatedStudent = {
                    id,
                    ...payload
                };
                return updatedStudent
            } else return student
        });

        this.students = updatedStudentList

        return updatedStudent
    }

    getStudentsByTeacherId(teacherId: string): FindStudentResponseDto[] {
        return this.students.filter(student => {
            return student.teacher === teacherId
        })
    }
    updateStudentTeacher(teacherId: string, studentId: string): StudentResponseDto {
        let updatedStudent: StudentResponseDto

        let updatedStudentList = this.students.map(student => {
            if(student.id === studentId){
                updatedStudent = {
                    ...student,
                    teacher: teacherId
                };
                return updatedStudent
            } else return student
        });

        this.students = updatedStudentList

        return updatedStudent
    }
}