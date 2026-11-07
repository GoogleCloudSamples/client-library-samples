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

// [START artifactregistry_v1_artifactregistry_rule_update]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	"cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateRule updates an existing repository rule.
func updateRule(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, ruleID string) error {
	rule := &artifactregistrypb.Rule{
		Name:   fmt.Sprintf("projects/%s/locations/%s/repositories/%s/rules/%s", projectID, locationID, repositoryID, ruleID),
		Action: artifactregistrypb.Rule_ALLOW,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"action"},
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.UpdateRuleRequest{
		Rule:       rule,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateRule(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateRule: %w", err)
	}

	fmt.Fprintf(w, "Updated rule: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1_artifactregistry_rule_update]
