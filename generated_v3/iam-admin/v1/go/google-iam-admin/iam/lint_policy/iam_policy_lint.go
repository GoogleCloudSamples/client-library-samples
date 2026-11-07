// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START iam-admin_v1_iam_lint_policy]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
	"google.golang.org/genproto/googleapis/type/expr"
)

// lintPolicy checks an IAM policy condition for syntax and semantics issues.
func lintPolicy(ctx context.Context, w io.Writer) error {
	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	projectID := "example-project-id"
	fullResourceName := fmt.Sprintf("//iam.googleapis.com/projects/%s", projectID)

	condition := &expr.Expr{
		Expression: "request.time < timestamp('2020-10-01T00:00:00Z')",
		Title:      "check_expiration",
	}

	req := &adminpb.LintPolicyRequest{
		FullResourceName: fullResourceName,
		LintObject: &adminpb.LintPolicyRequest_Condition{
			Condition: condition,
		},
	}

	resp, err := client.LintPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("LintPolicy failed: %w", err)
	}

	for _, result := range resp.GetLintResults() {
		fmt.Fprintf(w, "Validation unit: %s, Severity: %s, Message: %s\n",
			result.GetValidationUnitName(),
			result.GetSeverity(),
			result.GetDebugMessage(),
		)
	}

	if len(resp.GetLintResults()) == 0 {
		fmt.Fprintln(w, "No lint issues found.")
	}

	return nil
}

// [END iam-admin_v1_iam_lint_policy]
