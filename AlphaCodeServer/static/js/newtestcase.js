var newtestcase = `<div class="tab-pane fade" id="q{{qno}}-tc-{{forloop.counter}}" role="tabpanel" aria-labelledby="home-tab">
<div class="form-row" id="testcase-row">
  <div class="testcase-container form-group col-md">
    <div class="addtestcasebtn">

      <div class="form-row" style="margin-top:10px">
        <div class="form-group col-md-2">

          <select class="form-control" id="testcasetype{{forloop.counter}}" name="testcasetype{{forloop.counter}}">
            <option value="Hidden">Hidden</option>
            <option value="Visible">Visible</option>
          </select>
        </div>
        <div class="form-group col-md-2">

          <select class="form-control" id="outputtype{{forloop.counter}}" name="outputtype{{forloop.counter}}">
            <option value="Static">Static o/p</option>
            <option value="Dynamic">Dynamic o/p</option>
          </select>
        </div>

      </div>

      <br>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Input</label>
          <textarea class="form-control col-md testcase" rows="3" name="testcaseip{{forloop.counter}}"
            placeholder="Program input" required></textarea>
        </div>
        <div class="form-group col-md-6">
          <label>Output</label>
          <textarea class="form-control testcase col-md" rows="3" name="outputeval{{forloop.counter}}"
            placeholder="Output or evalcode" style="margin-left: 10px;"
            required></textarea>
        </div>
      </div>

    </div>
  </div>
</div>
</div>`
