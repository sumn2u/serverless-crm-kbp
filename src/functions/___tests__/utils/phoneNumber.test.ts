import {adaptPhoneNum} from '../../utils/phoneNumber';
test('# adapt phone number', () => {
    expect(adaptPhoneNum('+972534321460')).toBe('0534321460');
    expect(adaptPhoneNum('+9720534321460')).toBe('0534321460');
    expect(adaptPhoneNum('0534321460')).toBe('0534321460');
})