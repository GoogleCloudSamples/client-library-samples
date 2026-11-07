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

// [START policytroubleshooter_v3_policytroubleshooter_troubleshoot_iam_policy]

import (
	"context"
	"fmt"
	"io"

	policytroubleshooter "cloud.google.com/go/policytroubleshooter/iam/apiv3"
	"cloud.google.com/go/policytroubleshooter/iam/apiv3/iampb"
)

// troubleshootIamPolicy evaluates whether a principal has a specific permission on a resource.
func troubleshootIamPolicy(ctx context.Context, w io.Writer, principal string, fullResourceName string, permission string) error {
	accessTuple := &iampb.AccessTuple{
		Principal:        principal,
		FullResourceName: fullResourceName,
		Permission:       permission,
	}

	client, err := policytroubleshooter.NewPolicyTroubleshooterClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPolicyTroubleshooterClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.TroubleshootIamPolicyRequest{
		AccessTuple: accessTuple,
	}

	resp, err := client.TroubleshootIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("TroubleshootIamPolicy: %w", err)
	}

	fmt.Fprintf(w, "Overall access state: %s\n", resp.GetOverallAccessState())
	return nil
}

// [END policytroubleshooter_v3_policytroubleshooter_troubleshoot_iam_policy]
